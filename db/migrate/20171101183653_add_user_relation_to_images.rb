class AddUserRelationToImages < ActiveRecord::Migration[5.1]
  def change
    add_reference :images, :user, index: true, null: false
  end
end
