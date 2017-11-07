class DropTableExports < ActiveRecord::Migration[5.1]
  def up
    drop_table :exports
    create_table :exports do |t|
      t.belongs_to :user, null: false
      t.belongs_to :upload, null: false
      t.string :share, null: false

      t.timestamps null: false
    end
  end

  def down
    drop_table :exports
    create_table :exports do |t|
      t.belongs_to :user, null: false
      t.belongs_to :image, null: false
      t.string :share, null: false

      t.timestamps null: false
    end
  end
end
