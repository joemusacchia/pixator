require 'spec_helper'

feature 'sign up' do
# Acceptance Criteria:
# I must specify a valid email address
# I must specify a password, and confirm that password
# if I do not perform above, I get an error message
# If I specify valid information, I register my account and am authenticated

  xscenario 'specifying valid and required information' do
    vist root_path
    click_link 'Sign Up'
    fill_in 'First Name', with: 'John'
    fill_in 'Last Name', with: 'Smith'
    fill_in 'Email', with: 'user@example.com'
    fill_in 'Password', with: 'password'
    fill_in 'Password Confirmation', with: 'password'
    click_button 'Sign Up'

    expect(page).to have_content("You're in!")
    expect(page).to have_content("Sign Out")

  end

  # scenario 'required information is not supported' do
  #
  # end
  #
  # scenario 'password confirmation does not match confirmation' do
  #
  # end
end
