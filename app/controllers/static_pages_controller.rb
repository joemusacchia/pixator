class StaticPagesController < ApplicationController
  def index
    if current_user
      render :'static_pages/index'
    else
      redirect_to '/users/sign_in'
    end
  end
end
