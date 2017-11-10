class ExportsController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :authenticate_user!
  def show
    current_export = Export.find_by(id: params[:id])
    export_belongs_to = User.find_by(id: current_export.user_id)
    upload_requested = Upload.find_by(id: current_export.upload_id)
    upload_belongs_to = User.find_by(id: upload_requested.user_id)
    render json: {
      current_user: current_user,
      current_export: current_export,
      user_info: {export_belongs_to: export_belongs_to, upload_belongs_to: upload_belongs_to}
    }
  end
end
