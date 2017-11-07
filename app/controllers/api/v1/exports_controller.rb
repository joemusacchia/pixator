class Api::V1::ExportsController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :authenticate_user!

  def create
    newExport = Export.new
    newExport.share = params["share"]
    newExport.user = User.find_by(id: params["user_id"])
    newExport.upload = Upload.find_by(id: params["upload_id"])
    newExport.save
  end
end
