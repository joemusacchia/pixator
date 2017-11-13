class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :export

  validates :user_id, presence: true
  validates :export_id, presence: true
  validates :body, presence: true
end
