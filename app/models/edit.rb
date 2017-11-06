class Edit < ApplicationRecord
  belongs_to :user
  belongs_to :upload

  validates :slider_r, presence: true
  validates :slider_g, presence: true
  validates :slider_b, presence: true
  validates :text_body, presence: true
end
