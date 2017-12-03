require "spec_helper"
require "pry"

# let!(:user) {User.create(first_name: "first", last_name: "last", username: "username", email: "123@gmail.com", password: "1234567", password_confirmation: "1234567")}

describe Upload do
  it { should belong_to :user }
  it { should have_many :exports }
  it { should have_many :edits }

  it "create a test upload image" do
    test_user = User.new(first_name: "first", last_name: "last", username: "username", email: "123@gmail.com", password: "1234567", password_confirmation: "1234567")
    binding.pry
    test_upload  = FactoryBot.create(:upload, user: test_user)
    binding.pry

    expect(test_upload['file']).to eq "test_image.jpg"
  end

  # it { should have_valid(:file).when("titanrotating_st_380h.jpg") }
  # it { should_not have_valid(:file).when(nil, '') }

end
