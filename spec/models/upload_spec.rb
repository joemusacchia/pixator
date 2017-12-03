require "spec_helper"

describe Upload do
  it { should belong_to :user }
  it { should have_many :exports }
  it { should have_many :edits }

  it "create a test upload image" do
    test_user = User.create(first_name: "first", last_name: "last", username: "username", email: "123@gmail.com", password: "1234567", password_confirmation: "1234567")
    test_upload  = FactoryBot.create(:upload, user_id: test_user.id)

    expect(test_upload['file']).to eq "test_image.jpg"
  end

end
