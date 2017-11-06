class RenameImagesTableToUploads < ActiveRecord::Migration[5.1]
  def change
    rename_table :images, :uploads
  end
end
