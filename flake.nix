{
  inputs = {
    nixpkgs.url = "github:cachix/devenv-nixpkgs/rolling";
    systems.url = "github:nix-systems/default";
    devenv.url = "github:cachix/devenv";
    devenv.inputs.nixpkgs.follows = "nixpkgs";
  };

  #nixConfig = {
  #  extra-trusted-public-keys = "devenv.cachix.org-1:w1cLUi8dv3hnoSPGAuibQv+f9TZLr6cv/Hm9XgU50cw=";
  #  extra-substituters = "https://devenv.cachix.org";
  #};

  outputs = {
    self,
    nixpkgs,
    devenv,
    systems,
    ...
  } @ inputs: let
    forEachSystem = nixpkgs.lib.genAttrs (import systems);
  in {
    packages = forEachSystem (system: {
      devenv-up = self.devShells.${system}.default.config.procfileScript;
    });

    devShells =
      forEachSystem
      (system: let
        pkgs = nixpkgs.legacyPackages.${system};
      in {
        default = devenv.lib.mkShell {
          inherit inputs pkgs;
          modules = [
            {
              # https://devenv.sh/reference/options/
              packages = with pkgs; [
                # Node
                nodePackages.pnpm
                nodePackages.nodejs

                # Dotnet
                dotnet-sdk_8
                fsautocomplete
                fantomas
                mono
                msbuild

                # Sql
              ];

              processes = {
                webapp.exec = "cd code && DOTNET_SYSTEM_CONSOLE_ALLOW_ANSI_COLOR_REDIRECTION=1 dotnet run";
                migration.exec = "cd code/src/Migrations && DOTNET_SYSTEM_CONSOLE_ALLOW_ANSI_COLOR_REDIRECTION=1 dotnet run";
              };

              services.postgres = {
                enable = true;
                package = pkgs.postgresql_15;
                initialDatabases = [{name = "manager";}];
                listen_addresses = "127.0.0.1";
                initialScript = ''
                  CREATE USER api SUPERUSER PASSWORD 'admin';
                '';
              };

              scripts.clear-postgres.exec = ''
                rm -rf .devenv/state/postgres/
              '';
            }
          ];
        };
      });
  };
}
