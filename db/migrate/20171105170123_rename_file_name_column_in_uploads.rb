class RenameFileNameColumnInUploads < ActiveRecord::Migration[5.1]
  def change
    rename_column :uploads, :file_name, :file
  end
end
