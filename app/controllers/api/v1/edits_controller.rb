class Api::V1::EditsController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :authenticate_user!

  def create
  end

  def update
  end
end


# newImage.slider_r = 255
# newImage.slider_g = 255
# newImage.slider_b = 255
# newImage.text_body = "test"
# newImage.edited = false
