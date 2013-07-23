# Connection and Application stuff
set :ip, "198.58.109.239"
set :application, "parks.authenticff.com"

set :user, 'root'
set :port, 24
set :deploy_to, "/var/www/#{application}"
set :doc_root, "public"

# Just run the commands since we are 'root'.
set :run_method, :run

# Roles
role :app, "198.58.109.239"
role :web, "198.58.109.239"
role :db,  "198.58.109.239", :primary => true

# Additional SCM settings
set :scm, :git
set :ssh_options, { :forward_agent => true }
set :deploy_via, :remote_cache
set :copy_strategy, :checkout
set :keep_releases, 3
set :copy_compression, :bz2

set :repository, "git@codebasehq.com:thegoodlab/broomfield/parksapp.git"
set :branch, "master"

default_run_options[:pty] = true

# Deployment process
# after "deploy:update", "deploy:cleanup"
# after "deploy:setup", "setup:assign_ownership"
# after "deploy", "deploy:create_symlinks", "deploy:set_permissions"

after "deploy", "deploy:cleanup"
after "deploy:update_code", "composer:install"
before "composer:install", "composer:copy_vendors"

namespace :composer do
  desc "Copy vendors from previous release"
  task :copy_vendors, :except => { :no_release => true } do
    run "if [ -d #{previous_release}/composer_modules ]; then cp -a #{previous_release}/composer_modules #{latest_release}/composer_modules; fi"
  end
  task :install do
    run "sh -c 'cd #{latest_release} && curl -s http://getcomposer.org/installer | #{php_bin}'"
    run "sh -c 'cd #{release_path} && ./composer.phar install'"
  end
end