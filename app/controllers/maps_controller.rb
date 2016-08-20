class MapsController < ApplicationController
    def index
        respond_to do |format|
            format.html
            format.json {render json: Map.all}
        end
    end
end
