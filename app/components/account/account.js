angular.module('accountModule')
  .controller('AccountCtrl', ['$scope', 'ModalService',
   function ($scope, ModalService) {
    $scope.times = [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 01, 02, 03, 04, 05, 06, 07, 08, 09, 10, 11, 12];

    // Team for setting up acc page properly
    $scope.currentTeam = [
      {
        admin_group: 'none',
        created_at: "2015-04-02 10:26:43",
        disabled: 0,
        display: "Youchra",
        email: "admin@competeleague.com",
        id: 1,
        league_id: 0,
        team_id: 1,
        updated_at: "2015-04-02 10:26:43",
        position: 'TopLane',
        sumName: 'TlC Youchra',
        member_group: "captain"
      },
      {
        admin_group: 'none',
        created_at: "2015-04-02 10:26:43",
        disabled: 0,
        display: "Caine",
        email: "admin@competeleague.com",
        id: 1,
        league_id: 0,
        team_id: 1,
        updated_at: "2015-04-02 10:26:43",
        position: 'Jungle',
        sumName: 'TlC Caine',
        member_group: "captain"
      },
      {
        admin_group: 'none',
        created_at: "2015-04-02 10:26:43",
        disabled: 0,
        display: "Farziss",
        email: "admin@competeleague.com",
        id: 1,
        league_id: 0,
        team_id: 1,
        updated_at: "2015-04-02 10:26:43",
        position: 'Mid',
        sumName: 'TlC Farziss',
        member_group: "captain"
      },
      {
        admin_group: 'none',
        created_at: "2015-04-02 10:26:43",
        disabled: 0,
        display: "Dontchaa",
        email: "admin@competeleague.com",
        id: 1,
        league_id: 0,
        team_id: 1,
        updated_at: "2015-04-02 10:26:43",
        position: 'Marksman',
        sumName: 'TlC Dontchaa',
        member_group: "captain"
      },
      {
        admin_group: 'none',
        created_at: "2015-04-02 10:26:43",
        disabled: 0,
        display: "Star",
        email: "admin@competeleague.com",
        id: 1,
        league_id: 0,
        team_id: 1,
        updated_at: "2015-04-02 10:26:43",
        position: 'Support',
        sumName: 'TlC Star',
        member_group: "captain"
      },
      {
        admin_group: 'none',
        created_at: "2015-04-02 10:26:43",
        disabled: 0,
        display: "HHCRS52",
        email: "admin@competeleague.com",
        id: 1,
        league_id: 0,
        team_id: 1,
        updated_at: "2015-04-02 10:26:43",
        position: 'Substitute',
        sumName: 'TlC HHCRS52',
        member_group: "captain"
      },
      {
        admin_group: 'none',
        created_at: "2015-04-02 10:26:43",
        disabled: 0,
        display: "Vyren",
        email: "admin@competeleague.com",
        id: 1,
        league_id: 0,
        team_id: 1,
        updated_at: "2015-04-02 10:26:43",
        position: 'Substitute',
        sumName: 'TlC Vyren',
        member_group: "captain"
      },
      {
        admin_group: 'none',
        created_at: "2015-04-02 10:26:43",
        disabled: 0,
        display: "Deedsyo",
        email: "admin@competeleague.com",
        id: 1,
        league_id: 0,
        team_id: 1,
        updated_at: "2015-04-02 10:26:43",
        position: 'Substitute',
        sumName: 'TlC Deedsyo',
        member_group: "captain"
      },
      {
        admin_group: 'none',
        created_at: "2015-04-02 10:26:43",
        disabled: 0,
        display: "Fiesekartoffel",
        email: "admin@competeleague.com",
        id: 1,
        league_id: 0,
        team_id: 1,
        updated_at: "2015-04-02 10:26:43",
        position: 'Substitute',
        sumName: 'TlC Fiesekartoffel',
        member_group: "captain"
      }
    ];

    $scope.showAccSettings = function () {

      ModalService.showModal({
        templateUrl: "components/account/settings.html",
        controller: "SettingsCtrl"
      }).then(function(modal) {

        //it's a bootstrap element, use 'modal' to show it
        modal.element.modal();
        modal.close.then(function(result) {
          console.log(result);
        });
      });

    };
  }]);
