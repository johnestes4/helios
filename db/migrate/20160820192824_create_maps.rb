class CreateMaps < ActiveRecord::Migration[5.0]
  def change
    create_table :maps do |t|
      t.text :coordinates, array: true, default: []
      t.text :hashtag, array: true, default: []

      t.timestamps null: false
    end
  end
end
