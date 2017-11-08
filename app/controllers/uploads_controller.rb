class UploadsController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :authenticate_user!

  def show
    user_id = params["user_id"].to_i
    id = params["id"].to_i

    clicked_image = Upload.find_by(id: id)
    # if Edit.find_by(user_id: user_id, id: id) == nil
    #   specific_edit = {}
    # else
    #   specific_edit = Edit.find_by(user_id: user_id, id: id)
    # end


    render json: {
      current_user: current_user,
      clicked_image: clicked_image,
      # specific_edit: specific_edit
    }
  end
end
