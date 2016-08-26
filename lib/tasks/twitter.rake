namespace :twitter do
    desc "Opens Tweet Stream connection and scapes to DB"
    task scrape: :environment do
        TweetStream.configure do |config|
            config.consumer_key       = ''
            config.consumer_secret    = ''
            config.oauth_token        = ''
            config.oauth_token_secret = ''
            config.auth_method        = :oauth
        end
        puts 'I authenticated'

        total_lines = Map.all.length
        tweet_count = 0
        coord_count = 0
        place_count = 0
        # TweetStream::Client.new.filter() do |status|

        TweetStream::Client.new.locations([-180,-90,180,90]) do |status|
            # sleep 1

            # If the tweet has lat/long attatched to it
            if status.geo.longitude.to_s != ""
              # Do nothing - testing impact on spam.

              # tweet_count += 1
              # coord_count += 1
              # total_lines += 1
              # puts "------------------------------------------------------- Total added: " + tweet_count.to_s + " | Coords: " + coord_count.to_s + " | Places: " + place_count.to_s + " | Total Lines: " + total_lines.to_s
              #
              # text = status.text
              # puts text
              # hashtag_list = []
              # status.hashtags.each { |hashtag| hashtag_list.push(hashtag.text.downcase) }
              # coordinates = [status.geo.latitude.to_s, status.geo.longitude.to_s]
              # puts status.geo.latitude.to_s, status.geo.longitude.to_s
              #
              # # status.pry
              # Map.create(coordinates: coordinates, hashtag: hashtag_list, status: text)

            elsif status.place
              place_count += 1
              tweet_count += 1
              total_lines += 1
              puts "------------------------------------------------------- Total added: " + tweet_count.to_s + " | Coords: " + coord_count.to_s + " | Places: " + place_count.to_s + " | Total Lines: " + total_lines.to_s
              puts status.place.country

              text = status.text
              puts text

              hashtag_list = []
              status.hashtags.each { |hashtag| hashtag_list.push(hashtag.text.downcase) }

              # To get coordinates from a tweet that does not provide coordinate data, use place

              # coordinate_list is a list of four [lat, long] lists defining a bounding box
              coordinate_list = status.place.bounding_box.coordinates[0]

              # Get two opposite coordinates
              coord1 = coordinate_list[0]
              coord2 = coordinate_list[2]

              # Take the average of the two coordinates
              # For some reason, the twitter api defines their coord sets as long / lat, not lat / long
              coord_avg = [(coord1[1] + coord2[1]) / 2, (coord1[0] + coord2[0]) / 2]

              puts coord_avg

              Map.create(coordinates: coord_avg, hashtag: hashtag_list, status: text)
              puts coordinate_list.inspect()

            end
        end
    end
end
