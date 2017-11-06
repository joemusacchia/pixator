class User < ApplicationRecord
  has_many :uploads
  has_many :comments
  has_many :exports
  has_many :edits

  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :username, presence: true
  validates :admin, inclusion: { in: [true, false] }

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
end
