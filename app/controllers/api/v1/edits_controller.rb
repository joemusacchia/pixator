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
  end
end


# newImage.slider_r = 255
# newImage.slider_g = 255
# newImage.slider_b = 255
# newImage.text_body = "test"
# newImage.edited = false
