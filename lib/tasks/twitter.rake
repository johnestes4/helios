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
        TweetStream::Client.new.sample do |status|
            puts 'status was received'
            puts status.coordinates[0]
        end
    end
end
