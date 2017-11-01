class Image < ApplicationRecord
  belongs_to :user
  has_many :comments

  validates :file_name, presence: true
  validates :file_name, presence: true
  validates :slider_r, presence: true
  validates :slider_g, presence: true
  validates :slider_b, presence: true
  validates :text_body, presence: true
  validates :edited, inclusion: { in: [true, false] }
  validates :edited, presence: true

  mount_uploader :file_name, FileNameUploader
end
