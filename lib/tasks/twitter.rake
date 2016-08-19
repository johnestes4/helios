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
        TweetStream::Client.new.filter(:follow => [52422878, 14955353, 88703900, 21870081, 110422282, 17483462, 133448051, 17049258, 211228546, 375796206]) do |status|
            tweet=Tweet.new(:status => status.text, :user_name => status.user.screen_name)
            puts 'a tweet was received'
            if tweet.status !~ /^RT/
                tweet.save
                puts 'I saved a file'
            end
        end
    end
end
