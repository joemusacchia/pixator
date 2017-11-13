class Upload < ApplicationRecord
  belongs_to :user
  has_many :exports
  has_many :edits

  validates :file, presence: true
  validates :user_id, presence: true

  mount_uploader :file, FileUploader
end
