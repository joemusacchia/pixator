FactoryBot.define do
 factory :upload do
    # file Rack::Test::UploadedFile.new(File.open(File.join(Rails.root, "#{Rails.root}/spec/support/titanrotating_st_380h.jpg")))
    # initialize_with { new({ file: file }) }
    user_id 1
    file { Rack::Test::UploadedFile.new(Rails.root.join('spec', 'support', 'test_image.jpg'), 'image/jpeg') }

    #SOMEWHAT WORKING:
    # file { File.new("#{Rails.root}/spec/support/titanrotating_st_380h.jpg") }

    # user { User.create(first_name: "first", last_name: "last", username: "username", email: "123@gmail.com", password: "1234567", password_confirmation: "1234567") }
  end
end
