namespace :setup do
    desc "Does all the database"
    task bomb: :environment do
        Rake::Task['db:drop'].execute
        Rake::Task['db:create'].execute
        Rake::Task['db:migrate'].execute
        Rake::Task['db:seed'].execute
    end
end
