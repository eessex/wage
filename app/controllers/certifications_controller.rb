class CertificationsController < ApplicationController
  helper HasSubmitted

  def index
    @certifications = Certification.all
    render component: 'Certifications', props: { certifications: @certifications }
  end

  def show
    @certification = Certification.find(params[:id])
    @user = User.find(@certification.user_id)
    @certifications = Certification.where(user_id: @user.id) || []
    @fee_categories = FeeCategory.order('id')
    @artist_payments = @certification.artist_payments || []
    @root = ENV['HOST']
    @path = ENV['HOST'] + '/certifications/' + @certification.id.to_s
    if !current_user.admin
      render component: 'CertificationView', props: {
          path: @path,
          root: @root,
          certification: @certification,
          certifications: @certifications,
          artist_payments: @artist_payments,
          user: @user,
          new_user: false,
          fee_categories: @fee_categories
        }, class: "certification certification--view"
      else
        render component: 'AdminCertificationShow', props: {
          root: @root,
          path: @path,
          certification: @certification,
          certifications: @certifications,
          artist_payments: @artist_payments,
          user: @user,
          fee_categories: @fee_categories
        }, class: "admin-certification admin-certification--show"
    end
  end

  def create
    @certification = Certification.new(certification_params)
    respond_to do |format|
      format.json do
        if @certification.save
          render :json => @certification
        else
          render :json => { :errors => @certification.errors.messages }, :status => 422
        end
      end
    end
  end

  def update
    @certification = Certification.find(params[:id])
    @user = @certification.user
    submit = isSubmit(params, @certification)
    respond_to do |format|
      certification_params[:operating_expenses] = certification_params[:operating_expenses].gsub(",","")
      format.json do
        if @certification.update(certification_params)
          if submit == true && !current_user.admin
            WageMailer.submit_confirmation(@user, @certification).deliver_now
            render :json =>  { certification: @certification, notice: 'Your application has been successfully submitted, thank you.' }
          else
            render :json => @certification
          end
        else
          render :json => { :errors => @certification.errors.messages }, :status => 422
        end
      end
    end
  end

  def destroy
    Certification.find(params[:id]).destroy
    respond_to do |format|
      format.json { render :json => {}, :status => :no_content }
    end
  end


  private

  def isSubmit(params, certification)
    if params[:certification][:status] == "1" && certification.status < 1
      return true
    end
  end

  def certification_params
    params.require(:certification).permit(:id, :fiscal_start, :fiscal_end, :user_id, :status, :operating_expenses, :file_contract, :file_990, :qb_pl, :file_budget, :statement)
  end

  def fee_categories_list
    @fee_categories = []
    the_cats = FeeCategory.order('id')
    the_cats.map do |category|
      @fee_categories << { name: category.name, floor_fee: category.floor_fee }
    end
    @fee_categories
  end

end