require 'rails_helper'

RSpec.describe User, type: :model do
  context "user signs up" do
    it { should have_valid(:email).when('123@gmail.com')}
    it { should_not have_valid(:email).when(nil)}
  end

  it 'has a matching password confirmation fir the password' do
    user = User.new
    user.password = 'password'
    user.password_confirmation = 'anotherpassword'

    expect(user).to_not be_valid
    expect(user.errors[:password_confirmation]).to_not be_blank
  end

  context 'should be able to enter a first_name and last_name' do
    it { should have_valid(:first_name).when("firstname")}
    it { should_not have_valid(:first_name).when(nil), ''}

    it { should have_valid(:last_name).when("lastname")}
    it { should_not have_valid(:last_name).when(nil), ''}

    it { should have_valid(:username).when("username")}
    it { should_not have_valid(:username).when(nil), ''}
  end

  context 'should be able to be an admin' do
    it { should have_valid(:admin).when(true)}
    it { should have_valid(:admin).when(false)}
  end
end
