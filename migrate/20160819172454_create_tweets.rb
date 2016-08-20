class CreateTweets < ActiveRecord::Migration[5.0]
  def change
    create_table :tweets do |t|
        t.text :coordinates, array: true, default: []
        t.text :hashtag, array: true, default: []
        t.timestamps null: false
    end
  end
end


# # place,
# "place":
# {
#     "attributes":{},
#      "bounding_box":
#     {
#         "coordinates":
#         [[
#                 [-77.119759,38.791645],
#                 [-76.909393,38.791645],
#                 [-76.909393,38.995548],
#                 [-77.119759,38.995548]
#         ]],
#         "type":"Polygon"
#     },
#      "country":"United States",
#      "country_code":"US",
#      "full_name":"Washington, DC",
#      "id":"01fbe706f872cb32",
#      "name":"Washington",
#      "place_type":"city",
#      "url": "http://api.twitter.com/1/geo/id/01fbe706f872cb32.json"
# }

# coordinates,"coordinates":
# {
#     "coordinates":
#     [
#         -75.14310264,
#         40.05701649
#     ],
#     "type":"Point"
# }
