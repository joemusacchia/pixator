class ExportsController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :authenticate_user!
  def show
    render json: {current_user: current_user, current_export: Export.find_by(id: params[:id])}
  end
end
