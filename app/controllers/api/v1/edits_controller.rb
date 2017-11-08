class Api::V1::EditsController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :authenticate_user!
  protect_from_forgery unless: -> { request.format.json? }

  def create

    extracted_params = params["editorState"]

    newEdit = Edit.new
    newEdit.slider_r = extracted_params["sliderRValue"]
    newEdit.slider_g = extracted_params["sliderGValue"]
    newEdit.slider_b = extracted_params["sliderBValue"]
    newEdit.text_body = extracted_params["textBody"]
    newEdit.upload = Upload.find_by(id: extracted_params["uploadedImage"]["id"])
    newEdit.user = User.find_by(id: extracted_params["currentUser"]["user_id"])

    newEdit.save

  end

  def update
    edit_record_to_patch = Edit.find_by(id: params["id"])

    edit_record_to_patch.update(
      slider_r: params["editorState"]["sliderRValue"],
      slider_g: params["editorState"]["sliderGValue"],
      slider_b: params["editorState"]["sliderBValue"],
      text_body: params["editorState"]["textBody"]
    )
  end

  def show
    edit_id = params["id"]
    current_edit = Edit.find_by(id: edit_id)
    current_image = Upload.find_by(id: current_edit.upload_id)
    render json: {
      current_user: current_user,
      current_image: current_image,
      current_edit: current_edit
    }
  end
end


# newImage.slider_r = 255
# newImage.slider_g = 255
# newImage.slider_b = 255
# newImage.text_body = "test"
# newImage.edited = false
