/*
 * RTKLIB WEB CONSOLE code is placed under the GPL license.
 * Written by Frederic BECQUIER (frederic.becquier@openiteam.fr)
 * Copyright (c) 2016, DROTEK SAS
 * All rights reserved.

 * If you are interested in using RTKLIB WEB CONSOLE code as a part of a
 * closed source project, please contact DROTEK SAS (contact@drotek.com).

 * This file is part of RTKLIB WEB CONSOLE.

 * RTKLIB WEB CONSOLE is free software: you can redistribute it and/or
 * modify it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.

 * RTKLIB WEB CONSOLE is distributed in the hope that it will be
 * useful, but WITHOUT ANY WARRANTY; without even the implied warranty
 * of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.

 * You should have received a copy of the GNU General Public License
 * along with RTKLIB WEB CONSOLE. If not, see <http://www.gnu.org/licenses/>.
 */

'use strict';

module.exports = /*@ngInject*/ function ($scope, configuration, $modalInstance,
                                         requiredParams, advancedParams, otherParams, cmdParams) {

    /* Controller parameters */
    $scope = angular.extend($scope, {
        requiredParameters: requiredParams,
        advancedParameters: advancedParams,
		otherParameters: otherParams,
        cmdParameters: cmdParams,
        customExtension: '.user',
        fileName: ''
    });
    
    function formatDate(number){
		var toReturn = number;
		if(number < 10){
			toReturn = '0' + toReturn;
		}
		
		return toReturn;
	}
    
    var date = new Date();
    var defaultName = formatDate(date.getFullYear());
    defaultName = defaultName + formatDate(date.getMonth()+1);
    defaultName = defaultName + formatDate(date.getDate());
    defaultName = defaultName + formatDate(date.getHours());
    defaultName = defaultName + formatDate(date.getMinutes());
    defaultName = defaultName + formatDate(date.getSeconds());
    
    $scope.fileName = defaultName

    /**
     * Function called to save config file
     */
    $scope.ok = function () {
        configuration.saveFile({
            'name': $scope.fileName + $scope.customExtension,
			'requiredParameters': $scope.requiredParameters, 
			'advancedParameters': $scope.advancedParameters,
			'otherParameters': $scope.otherParameters,
            'cmdParameters': $scope.cmdParameters
		}).then(function(data){
            $modalInstance.close('');
        });
        
    };

    /**
     * Function called to cancel the save.
     */
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
    
}