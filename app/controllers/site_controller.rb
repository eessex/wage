class SiteController < ApplicationController
  def index
    @certifications = Certification.all
    render component: 'Dashboard', props: { certifications: @certifications }
  end

  # def create
  #   @certification = Certification.new(certification_params)
  #   respond_to do |format|
  #     format.json do
  #       if @certification.save
  #         render :json => @certification
  #       else
  #         render :json => { :errors => @certification.errors.messages }, :status => 422
  #       end
  #     end
  #   end
  # end
  #
  # def update
  #   @certification = Certification.find(params[:id])
  #   respond_to do |format|
  #     format.json do
  #       if @certification.update(certification_params)
  #         render :json => @certification
  #       else
  #         render :json => { :errors => @certification.errors.messages }, :status => 422
  #       end
  #     end
  #   end
  # end

#   def destroy
#     Certification.find(params[:id]).destroy
#     respond_to do |format|
#       format.json { render :json => {}, :status => :no_content }
#     end
#   end
#
#   private
#
#   def certification_params
#     params.require(:certification).permit(:fiscal_start, :fiscal_end, :status)
#   end
end