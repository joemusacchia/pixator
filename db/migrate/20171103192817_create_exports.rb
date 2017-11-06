class CreateExports < ActiveRecord::Migration[5.1]
  def change
    create_table :exports do |t|
      t.belongs_to :user, null: false
      t.belongs_to :image, null: false
      t.string :share, null: false

      t.timestamps null: false
    end
  end
end
