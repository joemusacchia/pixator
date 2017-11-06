class CreateImages < ActiveRecord::Migration[5.1]
  def change
    create_table :images do |t|
      t.string :file_name, null: false
      t.integer :slider_r, null: false, default: 255
      t.integer :slider_g, null: false, default: 255
      t.integer :slider_b, null: false, default: 255
      t.string :text_body, null: false, default: ''
      t.boolean :edited, null: false, default: false

      t.timestamps null: false
    end
  end
end
