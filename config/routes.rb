Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root 'static_pages#index'

  namespace :api do
    namespace :v1 do
      resources :uploads, only: [:index]
      resources :edits, only: [:show]
      resources :comments, only: [:create]
      resources :users, only: [] do
        resources :uploads, only: [:create] do
          resources :edits, only: [:create, :update]
          resources :exports, only: [:create]
        end
      end
    end
  end

  resources :users, only: [] do
    resources :uploads, only: [:show] do
      resources :exports, only: [:show]
    end
  end

  get '*path', to: 'static_pages#index'
end
