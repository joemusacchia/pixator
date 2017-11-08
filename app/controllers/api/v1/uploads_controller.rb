class Api::V1::UploadsController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :authenticate_user!
  # protect_from_forgery unless: -> { request.format.json? }

  def create
    newImage = Upload.new
    newImage.file = params["file"]
    newImage.user = current_user
    if newImage.save
      render json: Upload.last
    end
  end

  def index
    render json: {
      current_user: current_user,
      uploads: Upload.all,
      edits: Edit.all,
      exports: Export.all
    }
  end
end
