class Api::V1::CommentsController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :authenticate_user!
  protect_from_forgery unless: -> { request.format.json? }
  def create
    newComment = Comment.new
    newComment.user = User.find_by(id: params[:commentInfo][:user_id])
    newComment.export = Export.find_by(id: params[:commentInfo][:export_id])
    newComment.body = params[:commentInfo][:body]

    newComment.save
    render json: {
      comment: newComment, username: User.find_by(id: newComment.user_id).username
    }
  end
end
