class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :upload

  validates :user_id, presence: true
  validates :upload_id, presence: true
  validates :body, presence: true
end
