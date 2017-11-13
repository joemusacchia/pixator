class DropTableComments < ActiveRecord::Migration[5.1]
  def up
    drop_table :comments
    create_table :comments do |t|
      t.belongs_to :user, null: false
      t.belongs_to :export, null: false
      t.string :body, null: false

      t.timestamps null: false
    end
  end

  def down
    drop_table :comments
    create_table :comments do |t|
      t.belongs_to :user, null: false
      t.belongs_to :image, null: false
      t.string :body, null: false

      t.timestamps null: false
    end
  end
end
