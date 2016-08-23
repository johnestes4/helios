namespace :twitter do
    desc "Opens Tweet Stream connection and scapes to DB"
    task scrape: :environment do
        TweetStream.configure do |config|
            config.consumer_key       = 'nb5G3E9ZWsgRKhlNjSjjk3RBj'
            config.consumer_secret    = '4o6ulNdhr1aV1bc7JfyaSmt7O7TgNRejekoZL8eWO8C9G5RVBb'
            config.oauth_token        = '375796206-snaaskLlUfipHuyt1VsM552tJla7HD9JVZfG7MeG'
            config.oauth_token_secret = 'Xr5g9gMjBAffqhOVuukIefPeLojGO6dU7sRitQrQ5ueGn'
            config.auth_method        = :oauth
        end
        puts 'I authenticated'
        tweet_count = 0
        # TweetStream::Client.new.filter() do |status|

        TweetStream::Client.new.locations([-180,-90,180,90]) do |status|
            if status.geo.longitude.to_s != ""
              tweet_count += 1
              puts "-----------------------------------------------------------------" + tweet_count.to_s
              text = status.text
              puts text
              hashtag_list = []
              status.hashtags.each { |hashtag| hashtag_list.push(hashtag.text.downcase) }
              coordinates = [status.geo.latitude.to_s, status.geo.longitude.to_s]
              puts status.geo.latitude.to_s, status.geo.longitude.to_s


              Map.create(coordinates: coordinates, hashtag: hashtag_list, status: text)

            end
        end
    end
end
