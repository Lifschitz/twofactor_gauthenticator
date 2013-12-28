if (window.rcmail) {
  rcmail.addEventListener('init', function(evt) {

	  // ripped from PHPGansta/GoogleAuthenticator.php
		function createSecret(secretLength)
		{
			if(!secretLength) secretLength = 16;
			
		    LookupTable = new Array(
		            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', //  7
		            'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', // 15
		            'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', // 23
		            'Y', 'Z', '2', '3', '4', '5', '6', '7' // 31
		            //'='  // padding char
		        );
		
		    secret = '';
		    for (i = 0; i < secretLength; i++) {
		        secret += LookupTable[Math.floor(Math.random()*LookupTable.length)];
		    }
		    return secret;
		}	    
	  
	  
	  // to show/hide secret
	  $('#2FA_change_secret').click(function(){
		  if($('#2FA_secret').get(0).type == 'text') {
			  $('#2FA_secret').get(0).type = 'password';
			  $('#2FA_change_secret').get(0).value = rcmail.gettext('show_secret', 'twofactor_gauthenticator');
		  }
		  else
		  {
			  $('#2FA_secret').get(0).type = 'text';
			  $('#2FA_change_secret').get(0).value = rcmail.gettext('hide_secret', 'twofactor_gauthenticator');
		  }
	  });
	  
	  // to show/hide recovery_codes
	  $('#2FA_show_recovery_codes').click(function(){

		  if($("[name^='2FA_recovery_codes']")[0].type == 'text') {
			  $("[name^='2FA_recovery_codes']").each(function() {
				  $(this).get(0).type = 'password';
			  });
			  $('#2FA_show_recovery_codes').get(0).value = rcmail.gettext('show_recovery_codes', 'twofactor_gauthenticator');
		  }
		  else {
			  $("[name^='2FA_recovery_codes']").each(function() {
				  $(this).get(0).type = 'text';
			  });
			  $('#2FA_show_recovery_codes').get(0).value = rcmail.gettext('hide_recovery_codes', 'twofactor_gauthenticator');
		  }
	  });
	  
	  
	  // to show/hide qr_code
	  $('#2FA_change_qr_code').click(function(e){
		  e.stopPropagation();
		  
		  if( $('#2FA_qr_code').is(':visible') ) {
			  $('#2FA_qr_code').slideUp();
			  $(this).get(0).value = rcmail.gettext('show_qr_code', 'twofactor_gauthenticator');
		  }
		  else {
			$('#2FA_qr_code').slideDown();
		  	$(this).get(0).value = rcmail.gettext('hide_qr_code', 'twofactor_gauthenticator');
		  }
	  });
	  
	  // create secret
	  $('#2FA_create_secret').click(function(){
		  $('#2FA_secret').get(0).value = createSecret();
	  });
	  
    
    // Define Variables
    var tabtwofactorgauthenticator = $('<span>').attr('id', 'settingstabplugintwofactor_gauthenticator').addClass('tablink');
    var button = $('<a>').attr('href', rcmail.env.comm_path + '&_action=plugin.twofactor_gauthenticator').html(rcmail.gettext('twofactor_gauthenticator', 'twofactor_gauthenticator')).appendTo(tabtwofactorgauthenticator);
    
    button.bind('click', function(e){ return rcmail.command('plugin.twofactor_gauthenticator', this) });

    // Button & Register commands
    rcmail.add_element(tabtwofactorgauthenticator, 'tabs');
    rcmail.register_command('plugin.twofactor_gauthenticator', function() { rcmail.goto_url('plugin.twofactor_gauthenticator') }, true);
    rcmail.register_command('plugin.twofactor_gauthenticator-save', function() {
    	if(!$('#2FA_secret').get(0).value) {
    		$('#2FA_secret').get(0).value = createSecret();
    	}
        rcmail.gui_objects.twofactor_gauthenticatorform.submit();
    }, true);
  });
}