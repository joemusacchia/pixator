class RemoveColumnsFromUploads < ActiveRecord::Migration[5.1]
  def up
    remove_column :uploads, :slider_r
    remove_column :uploads, :slider_g
    remove_column :uploads, :slider_b
    remove_column :uploads, :text_body
    remove_column :uploads, :edited
  end

  def down
    add_column :uploads, :slider_r, :integer, null: false, default: 255
    add_column :uploads, :slider_g, :integer, null: false, default: 255
    add_column :uploads, :slider_b, :integer, null: false, default: 255
    add_column :uploads, :text_body, :string, null: false, default: ''
    add_column :uploads, :edited, :boolean, null: false, default: false
  end
end
