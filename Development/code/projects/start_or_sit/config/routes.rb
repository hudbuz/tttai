Rails.application.routes.draw do

  root 'application#index'
  get 'download' => 'player_data#download'
  get 'getstats' => 'player_data#get_stats'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
