# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

$i = 0
$num = 500
while $i < $num  do
    coordinates = [Faker::Address.latitude, Faker::Address.longitude]
    testLat = coordinates[0].to_f
    testLong = coordinates[1].to_f
    tag=['#trump', '#blm', '#isis', '#election2016', '#Im with here', '#cake']
    if (testLat < 70 && testLat > 30 && testLong < 120 && testLong > 0) || (testLat < 37  && testLat > 0 && testLong < 50 && testLong > 0) || (testLat < 50 && testLat > 30 && testLong > -120 && testLong < -80)
        Map.create(coordinates: [coordinates[0], coordinates[1]], hashtag:[tag.sample])
        $i +=1
    end
end
# $$c(W 124°49'00"--W 67°08'00"/N 50°30'00"--N 8°24'00")
#     if coordinates[0] < 124 && coordinates[0]
