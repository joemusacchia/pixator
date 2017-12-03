FactoryBot.define do
 factory :upload do
    user_id 1
    file { Rack::Test::UploadedFile.new(Rails.root.join('spec', 'support', 'test_image.jpg'), 'image/jpeg') }

    # ALTERNATIVE WORKING SYNTAX:
    # file { File.new("#{Rails.root}/spec/support/titanrotating_st_380h.jpg") }
  end
end
