class Export < ApplicationRecord
  belongs_to :user
  belongs_to :upload
  
  validates :share, presence: true

  mount_uploader :share, ShareUploader
end
