class Export < ApplicationRecord
  belongs_to :user
  belongs_to :upload
  has_many :comments

  validates :share, presence: true
  validates :upload, presence: true
  validates :user, presence: true

  mount_uploader :share, ShareUploader
end
