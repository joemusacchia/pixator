class Export < ApplicationRecord
  belongs_to :user
  belongs_to :upload

  validates :user_id, presence: true
  validates :image_id, presence: true
  validates :share, presence: true

  mount_uploader :share, ShareUploader
end
