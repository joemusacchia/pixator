class CreateEdits < ActiveRecord::Migration[5.1]
  def change
    create_table :edits do |t|
      t.belongs_to :user, null: false
      t.belongs_to :upload, null: false

      t.integer :slider_r, null: false, default: 255
      t.integer :slider_g, null: false, default: 255
      t.integer :slider_b, null: false, default: 255
      t.string :text_body, default: ''

      t.timestamps null: false
    end
  end
end
