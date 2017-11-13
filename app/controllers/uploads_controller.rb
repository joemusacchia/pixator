class UploadsController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :authenticate_user!

  def show
    user_id = params["user_id"].to_i
    id = params["id"].to_i

    clicked_image = Upload.find_by(id: id)

    render json: {
      current_user: current_user,
      clicked_image: clicked_image,
    }
  end
end
